
import os
import dj_database_url
from dotenv import load_dotenv
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

env_file = BASE_DIR.parent / '.env'
if env_file.exists():
    load_dotenv(env_file)

# Application definition

INSTALLED_APPS = (
    'rest_framework',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'phonenumber_field',
    'django.contrib.sites',
    'sanjuroville',
    'resume',
    'library'
)

MIDDLEWARE = (
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

DEFAULT_AUTO_FIELD = 'django.db.models.AutoField'

ROOT_URLCONF = 'sanjuroville.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

STATIC_ROOT = BASE_DIR / 'assets'
STATIC_URL = '/static/'
STATICFILES_DIRS = [
     BASE_DIR / 'build'
]

WSGI_APPLICATION = 'sanjuroville.wsgi.application'

REST_FRAMEWORK = {
    # Use Django's standard `django.contrib.auth` permissions,
    # or allow read-only access for unauthenticated users.
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticatedOrReadOnly'
    ]
}

# Internationalization
# https:ocs.djangoproject.com/en/1.8/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'America/Los_Angeles'

USE_I18N = True

USE_L10N = True

USE_TZ = True

SITE_TITLE = 'Admin Index'
SITE_HEADER = 'Site administration'
INDEX_TITLE = 'Sanjuroville'

SITE_ID = 1

SECRET_KEY = os.getenv('SECRET_KEY', 'this_is_not_the_key_you_are_looking_for')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.getenv('DEBUG', False)

CORS_ORIGIN_ALLOW_ALL = os.getenv('CORS_ORIGIN_ALLOW_ALL', False)

ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', 'localhost').split(',')

X_FRAME_OPTIONS = os.getenv('X_FRAME_OPTIONS', 'DENY')

default_db_url = 'sqlite:///' + str(BASE_DIR / 'sqlite3.db')
DATABASES = {'default': dj_database_url.parse(os.getenv('DATABASE_URL', default_db_url))}
