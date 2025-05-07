from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, ProductViewSet, SpecialOfferViewSet  # 👈 SpecialOffer importieren

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'products', ProductViewSet)
router.register(r'offers', SpecialOfferViewSet)  # 👈 Angebote-Route hinzufügen

urlpatterns = [
    path('', include(router.urls)),
]
