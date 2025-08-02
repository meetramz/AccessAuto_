# Django CORS Settings Configuration
# Add this to your Django settings.py file

# Add 'corsheaders' to INSTALLED_APPS
INSTALLED_APPS = [
    # ... your other apps
    'corsheaders',
    # ... rest of your apps
]

# Add CorsMiddleware to MIDDLEWARE (should be at the top)
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    # ... your other middleware
]

# CORS Configuration
# Allow all origins during development (NOT recommended for production)
CORS_ALLOW_ALL_ORIGINS = True

# OR for production, specify allowed origins explicitly:
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # React dev server
    "http://127.0.0.1:3000",
    "https://your-frontend-domain.com",  # Your production frontend domain
    # Add your actual frontend URLs here
]

# Allow credentials (cookies, authorization headers)
CORS_ALLOW_CREDENTIALS = True

# Allowed headers
CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]

# Allowed methods
CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]

# Expose headers to frontend
CORS_EXPOSE_HEADERS = [
    'content-type',
    'x-csrftoken',
]

# Preflight max age
CORS_PREFLIGHT_MAX_AGE = 86400

# For API endpoints, you might also want to add:
CORS_URLS_REGEX = r'^/api/.*$'