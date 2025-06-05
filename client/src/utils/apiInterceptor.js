// API interceptor to handle token refresh automatically
class ApiInterceptor {
  constructor() {
    this.isRefreshing = false
    this.failedQueue = []
    this.tokenRefreshedCallback = null
  }

  // Register callback for token refresh
  onTokenRefreshed(callback) {
    this.tokenRefreshedCallback = callback
  }

  // Process failed queue after refresh
  processQueue(error, token = null) {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error)
      } else {
        resolve(token)
      }
    })

    this.failedQueue = []
  }

  // Refresh access token
  async refreshToken() {
    try {
      this.isRefreshing = true
      const response = await fetch("/api/auth/refresh-token", {
        method: "POST",
        credentials: "include",
      })

      if (response.ok) {
        const data = await response.json()

        // Notify listeners that token was refreshed
        if (this.tokenRefreshedCallback) {
          this.tokenRefreshedCallback()
        }

        this.isRefreshing = false
        return data.accessToken
      } else {
        this.isRefreshing = false
        throw new Error("Refresh failed")
      }
    } catch (error) {
      this.isRefreshing = false
      throw error
    }
  }

  // Enhanced fetch with automatic token refresh
  async fetchWithAuth(url, options = {}) {
    try {
      // First attempt
      const response = await fetch(url, {
        ...options,
        credentials: "include",
      })

      // If request is successful, return response
      if (response.ok) {
        return response
      }

      // If unauthorized and not already refreshing
      if (response.status === 401 && !this.isRefreshing) {
        const data = await response.json()

        // Check if it's an expired token error
        if (data.message === "Access token expired") {
          return new Promise((resolve, reject) => {
            // Add to queue
            this.failedQueue.push({ resolve, reject })

            if (!this.isRefreshing) {
              this.isRefreshing = true

              this.refreshToken()
                .then((token) => {
                  this.isRefreshing = false
                  this.processQueue(null, token)

                  // Retry original request
                  resolve(
                    fetch(url, {
                      ...options,
                      credentials: "include",
                    }),
                  )
                })
                .catch((error) => {
                  this.isRefreshing = false
                  this.processQueue(error, null)

                  // Session expired completely
                  this.handleSessionExpired()
                  reject(error)
                })
            }
          })
        }
      }

      return response
    } catch (error) {
      throw error
    }
  }

  // Handle complete session expiration
  handleSessionExpired() {
    // Clear any local storage
    localStorage.removeItem("currentUser")

    // Show session expired message
    const event = new CustomEvent("sessionExpired", {
      detail: { message: "Tu sesión ha expirado. Por favor, inicia sesión nuevamente." },
    })
    window.dispatchEvent(event)

    // Redirect to login after a short delay
    setTimeout(() => {
      window.location.href = "/sign-in"
    }, 2000)
  }
}

export const apiInterceptor = new ApiInterceptor()
