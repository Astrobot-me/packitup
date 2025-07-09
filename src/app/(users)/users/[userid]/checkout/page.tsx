import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CheckoutForm } from "@/components/checkout-form"

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-background">

      <main className="py-8">
        <CheckoutForm />
      </main>

    </div>
  )
}
