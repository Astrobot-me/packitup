import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FoodCatalog } from "@/components/food-catalog"

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="py-8">
        <FoodCatalog />
      </main>
    </div>
  )
}
