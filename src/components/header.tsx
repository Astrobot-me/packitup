"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ShoppingCart, Utensils } from "lucide-react"
import { CartSidebar } from "@/components/cart-sidebar"
import { useCart } from "@/components/cart-provider"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { items } = useCart()
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Utensils className="h-6 w-6 text-orange-500" />
          <span className="text-xl font-bold">FoodieHub</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium hover:text-orange-500 transition-colors">
            Home
          </Link>
          <Link href="/menu" className="text-sm font-medium hover:text-orange-500 transition-colors">
            Menu
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-orange-500 transition-colors">
            About
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-orange-500 transition-colors">
            Contact
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <CartSidebar>
            <Button variant="outline" size="sm" className="relative bg-transparent">
              <ShoppingCart className="h-4 w-4" />
              {itemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-orange-500">
                  {itemCount}
                </Badge>
              )}
            </Button>
          </CartSidebar>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="sm">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4 mt-8">
                <Link href="/" onClick={() => setIsOpen(false)}>
                  Home
                </Link>
                <Link href="/menu" onClick={() => setIsOpen(false)}>
                  Menu
                </Link>
                <Link href="#" onClick={() => setIsOpen(false)}>
                  About
                </Link>
                <Link href="#" onClick={() => setIsOpen(false)}>
                  Contact
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
