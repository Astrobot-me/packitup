"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Plus } from "lucide-react"
import { useCart } from "@/components/cart-provider"

const dishes = [
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Fresh tomatoes, mozzarella, and basil on crispy crust",
    price: 18.99,
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.8,
    category: "Pizza",
  },
  {
    id: 2,
    name: "Beef Burger Deluxe",
    description: "Juicy beef patty with lettuce, tomato, and special sauce",
    price: 15.99,
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.7,
    category: "Burgers",
  },
  {
    id: 3,
    name: "Chicken Pad Thai",
    description: "Stir-fried rice noodles with chicken and vegetables",
    price: 14.99,
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.9,
    category: "Asian",
  },
  {
    id: 4,
    name: "Caesar Salad",
    description: "Crisp romaine lettuce with parmesan and croutons",
    price: 12.99,
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.6,
    category: "Salads",
  },
]

export function PopularDishes() {
  const { addItem } = useCart()

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Popular Dishes</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our most loved dishes, carefully crafted by top chefs and loved by thousands.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dishes.map((dish) => (
            <Card key={dish.id} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={dish.image || "/placeholder.svg"}
                    alt={dish.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-orange-500">{dish.category}</Badge>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-4 w-4 text-orange-500 fill-current" />
                    <span className="text-sm font-medium">{dish.rating}</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{dish.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{dish.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-orange-500">${dish.price}</span>
                    <Button size="sm" onClick={() => addItem(dish)} className="bg-orange-500 hover:bg-orange-600">
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
