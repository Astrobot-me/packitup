import { Clock, Shield, Truck, Utensils } from "lucide-react"

const features = [
  {
    icon: Clock,
    title: "Fast Delivery",
    description: "Get your food delivered in 30 minutes or less, guaranteed fresh and hot.",
  },
  {
    icon: Utensils,
    title: "Quality Food",
    description: "We partner with the best restaurants to bring you premium quality meals.",
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "Your payments and personal information are always protected and secure.",
  },
  {
    icon: Truck,
    title: "Free Delivery",
    description: "Enjoy free delivery on orders over $25. No hidden fees or charges.",
  },
]

export function Features() {
  return (
    <section className="py-20 bg-white dark:bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Why Choose FoodieHub?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're committed to providing you with the best food delivery experience possible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-500 transition-colors">
                <feature.icon className="h-8 w-8 text-orange-500 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
