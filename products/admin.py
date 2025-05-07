from django.contrib import admin 
from .models import Product, Category, SpecialOffer  # 👈 SpecialOffer hinzufügen

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'stock', 'category', 'created_at')
    search_fields = ('name',)
    list_filter = ('category',)
    ordering = ('-created_at',)

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)

@admin.register(SpecialOffer)  # 👈 Neues Admin-Interface für Angebote
class SpecialOfferAdmin(admin.ModelAdmin):
    list_display = ('title', 'active')
    search_fields = ('title',)
    list_filter = ('active',)
