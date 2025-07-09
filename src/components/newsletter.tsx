import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
  return (
    <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center text-white">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Stay Updated with FoodieHub</h2>
          <p className="text-lg mb-8 opacity-90">
            Get the latest updates on new restaurants, special offers, and exclusive deals delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input type="email" placeholder="Enter your email" className="bg-white text-black" />
            <Button variant="secondary" className="bg-white text-orange-500 hover:bg-gray-100">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
