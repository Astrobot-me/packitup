import { Skeleton } from "./ui/skeleton";

export default function () {

    return (

        <div className="min-h-screen w-full bg-white text-black">
            <div className="flex flex-col md:flex-row">

                {/* --- Sidebar Skeleton --- */}
                {/* <aside className="w-full md:w-64 bg-gray-50 p-4 md:p-6 border-b md:border-r border-gray-200">

                    <div className="flex items-center gap-3 mb-8">
                        <Skeleton className="h-9 w-9 rounded-lg" />
                        <Skeleton className="h-5 w-28" />
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-8 w-full" />
                        </div>
                        <div className="space-y-2 pt-4">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-8 w-full" />
                        </div>
                    </div>
                </aside> */}

                {/* --- Main Content Area --- */}
                <main className="flex-1 p-4 md:p-8">
                    {/* --- Header Skeleton --- */}
                    <header className="flex items-center justify-between pb-6 border-b border-gray-200 mb-8">
                        {/* Search Bar */}
                        <Skeleton className="h-9 w-1/2 md:w-1/3" />

                        {/* User Profile */}
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-9 w-20 hidden sm:block" />
                            <Skeleton className="h-10 w-10 rounded-full" />
                        </div>
                    </header>

                    {/* --- Content Title --- */}
                    <div className="mb-8">
                        <Skeleton className="h-8 w-48 mb-2" />
                        <Skeleton className="h-4 w-64" />
                    </div>

                    {/* --- Grid of Skeleton Cards --- */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Card 1 */}
                        <div className="space-y-4 p-4 rounded-lg border border-gray-200">
                            <Skeleton className="h-32 w-full rounded-md" />
                            <div className="space-y-2">
                                <Skeleton className="h-5 w-3/4" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="space-y-4 p-4 rounded-lg border border-gray-200">
                            <Skeleton className="h-32 w-full rounded-md" />
                            <div className="space-y-2">
                                <Skeleton className="h-5 w-3/4" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="space-y-4 p-4 rounded-lg border border-gray-200">
                            <Skeleton className="h-32 w-full rounded-md" />
                            <div className="space-y-2">
                                <Skeleton className="h-5 w-3/4" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                            </div>
                        </div>
                        {/* Card 4 (visible on larger screens) */}
                        <div className="space-y-4 p-4 rounded-lg border border-gray-200 hidden sm:block">
                            <Skeleton className="h-32 w-full rounded-md" />
                            <div className="space-y-2">
                                <Skeleton className="h-5 w-3/4" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                            </div>
                        </div>
                        {/* Card 5 (visible on larger screens) */}
                        <div className="space-y-4 p-4 rounded-lg border border-gray-200 hidden lg:block">
                            <Skeleton className="h-32 w-full rounded-md" />
                            <div className="space-y-2">
                                <Skeleton className="h-5 w-3/4" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                            </div>
                        </div>
                        {/* Card 6 (visible on larger screens) */}
                        <div className="space-y-4 p-4 rounded-lg border border-gray-200 hidden lg:block">
                            <Skeleton className="h-32 w-full rounded-md" />
                            <div className="space-y-2">
                                <Skeleton className="h-5 w-3/4" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}