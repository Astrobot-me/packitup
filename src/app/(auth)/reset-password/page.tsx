import { ResetForm } from "@/components/reset-form"

export default function ResetPage() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 bg-gradient-to-br from-green-300 to-emerald-300">
      <div className="w-full max-w-sm flex justify-center">
        <ResetForm />
      </div>
    </div>
  )
}
