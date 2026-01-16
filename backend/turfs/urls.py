from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TurfViewSet, BookingViewSet

router = DefaultRouter()
router.register(r'turfs', TurfViewSet)
router.register(r'bookings', BookingViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
