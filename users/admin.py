from django.contrib import admin
from django.contrib import admin
from .models import Topping
from .models import Offer
@admin.register(Topping)
class ToppingAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'is_available')  # Fields to display 
    search_fields = ('name',)
    list_filter = ('is_available',)  


    fieldsets = (
        (None, {
            'fields': ('name', 'price', 'image', 'is_available')
        }),
    )
   

@admin.register(Offer)
class OfferAdmin(admin.ModelAdmin):
    list_display = ('name', 'discount_percentage', 'is_active', 'start_date', 'end_date')
    search_fields = ('name',)
    list_filter = ('is_active',)
 