from django.contrib import admin
from django.utils.html import format_html
from .models import Product, Category, SpecialOffer

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    ordering = ('name',)

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price_formatted', 'category_name', 'stock_status', 'product_image')
    list_filter = ('category', 'stock')
    search_fields = ('name', 'description')
    ordering = ('name',)
    readonly_fields = ('product_image_large',)
    
    fieldsets = (
        ('Produktinformationen', {
            'fields': ('name', 'description', 'price', 'category')
        }),
        ('Lagerbestand', {
            'fields': ('stock',)
        }),
        ('Produktbild', {
            'fields': ('image', 'product_image_large'),
        }),
    )
    
    def price_formatted(self, obj):
        return f"{obj.price:.2f} €"
    price_formatted.short_description = 'Preis'
    
    def category_name(self, obj):
        return obj.category.name
    category_name.short_description = 'Kategorie'
    
    def stock_status(self, obj):
        if obj.stock <= 0:
            return format_html('<span style="color: red; font-weight: bold;">Ausverkauft</span>')
        elif obj.stock <= 5:
            return format_html('<span style="color: orange; font-weight: bold;">Wenig ({0})</span>', obj.stock)
        else:
            return format_html('<span style="color: green;">Auf Lager ({0})</span>', obj.stock)
    stock_status.short_description = 'Lagerbestand'
    
    def product_image(self, obj):
        if obj.image:
            return format_html('<img src="{0}" height="50" />', obj.image.url)
        return format_html('<span style="color: #999">Kein Bild</span>')
    product_image.short_description = 'Bild'
    
    def product_image_large(self, obj):
        if obj.image:
            return format_html('<img src="{0}" height="300" style="border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" />', obj.image.url)
        return format_html('<span style="color: #999">Kein Bild vorhanden</span>')
    product_image_large.short_description = 'Bildvorschau'

class SpecialOfferAdmin(admin.ModelAdmin):
    list_display = ('title', 'offer_image')
    search_fields = ('title', 'description')
    ordering = ('title',)
    
    fieldsets = (
        ('Angebotsinformationen', {
            'fields': ('title', 'description')
        }),
        ('Angebotsbild', {
            'fields': ('image', 'offer_image_large'),
        }),
    )
    
    readonly_fields = ('offer_image_large',)
    
    def offer_image(self, obj):
        if obj.image:
            return format_html('<img src="{0}" height="50" />', obj.image.url)
        return format_html('<span style="color: #999">Kein Bild</span>')
    offer_image.short_description = 'Bild'
    
    def offer_image_large(self, obj):
        if obj.image:
            return format_html('<img src="{0}" height="300" style="border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" />', obj.image.url)
        return format_html('<span style="color: #999">Kein Bild vorhanden</span>')
    offer_image_large.short_description = 'Bildvorschau'

# Registriere die Models mit den angepassten Admin-Klassen
admin.site.register(Category, CategoryAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(SpecialOffer, SpecialOfferAdmin)

# Anpassung des Admin-Titels und Headers
admin.site.site_header = 'Rose Supermarkt - Verwaltung'
admin.site.site_title = 'Rose Supermarkt'
admin.site.index_title = 'Willkommen in der Rose Supermarkt Verwaltung'