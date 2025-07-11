"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Star, Plus, Search } from "lucide-react"
import { useCart } from "@/components/cart-provider"

const categories = ["All", "Pizza", "Burgers", "Asian", "Salads", "Desserts", "Beverages"]

const allDishes = [
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Fresh tomatoes, mozzarella, and basil on crispy crust",
    price: 18.99,
    image: "https://placekittens.com/g/200/300",
    rating: 4.8,
    category: "Pizza",
  },
  {
    id: 2,
    name: "Pepperoni Pizza",
    description: "Classic pepperoni with mozzarella cheese",
    price: 21.99,
    image: "https://placekittens.com/g/200/300",
    rating: 4.7,
    category: "Pizza",
  },
  {
    id: 3,
    name: "Beef Burger Deluxe",
    description: "Juicy beef patty with lettuce, tomato, and special sauce",
    price: 15.99,
    image: "https://placekittens.com/200/300",
    rating: 4.7,
    category: "Burgers",
  },
  {
    id: 4,
    name: "Chicken Burger",
    description: "Grilled chicken breast with avocado and mayo",
    price: 14.99,
    image: "https://placekittens.com/g/200/300",
    rating: 4.6,
    category: "Burgers",
  },
  {
    id: 5,
    name: "Chicken Pad Thai",
    description: "Stir-fried rice noodles with chicken and vegetables",
    price: 14.99,
    image: "https://placekittens.com/g/200/300",
    rating: 4.9,
    category: "Asian",
  },
  {
    id: 6,
    name: "Beef Ramen",
    description: "Rich broth with tender beef and fresh noodles",
    price: 16.99,
    image: "https://placekittens.com/g/200/300",
    rating: 4.8,
    category: "Asian",
  },
  {
    id: 7,
    name: "Caesar Salad",
    description: "Crisp romaine lettuce with parmesan and croutons",
    price: 12.99,
    image: "https://placekittens.com/g/200/300",
    rating: 4.6,
    category: "Salads",
  },
  {
    id: 8,
    name: "Greek Salad",
    description: "Fresh vegetables with feta cheese and olives",
    price: 13.99,
    image: "https://placekittens.com/g/200/300",
    rating: 4.5,
    category: "Salads",
  },
  {
    id: 9,
    name: "Chocolate Cake",
    description: "Rich chocolate cake with creamy frosting",
    price: 8.99,
    image: "https://placekittens.com/g/200/300",
    rating: 4.9,
    category: "Desserts",
  },
  {
    id: 10,
    name: "Tiramisu",
    description: "Classic Italian dessert with coffee and mascarpone",
    price: 9.99,
    image: "https://placekittens.com/g/200/300",
    rating: 4.8,
    category: "Desserts",
  },
]

export function FoodCatalog() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const  addItem = (dish : any) =>  {}

  const filteredDishes = allDishes.filter((dish) => {
    return allDishes
  })

  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4">Our Menu</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Discover our delicious selection of dishes, made with the finest ingredients.
        </p>

        {/* Search */}
        <div className="relative mb-6 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "bg-green-500 hover:bg-green-600" : ""}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Dishes Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredDishes.map((dish) => (
          <Card key={dish.id} className="group hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={dish.image || "/placeholder.svg"}
                  alt={dish.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-3 left-3 bg-green-500">{dish.category}</Badge>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-4 w-4 text-green-600 fill-current" />
                  <span className="text-sm font-medium">{dish.rating}</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{dish.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{dish.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-green-500">${dish.price}</span>
                  <Button size="sm" onClick={() => addItem(dish)} className="bg-green-500 hover:bg-green-600">
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDishes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No dishes found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
