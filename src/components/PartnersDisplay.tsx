export default function PartnersDisplay() {
    return (
        <div className="py-24 sm:py-32 flex justify-center items-center">
            <div className="mx-auto my-24 md:my-48 max-w-7xl px-6 lg:px-8">
                <h2 className="mb-10 text-lg opacity-50 text-center leading-8 text-gray-900 dark:text-white">
                    Our partners make sure our players focus on performance:
                </h2>
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-4 py-5">
                        <div className={"flex flex-col items-center hover:animate-pulse cursor-pointer"}>
                            <h1 className="text-gray-900 dark:text-white font-bold text-xl md:text-4xl tracking-tight">
                                청심당
                            </h1>
                            <h3 className="text-gray-900 dark:text-white text-sm md:text-md tracking-tight opacity-50">
                                Korean Medical Clinic
                            </h3>
                        </div>
                        <div className={"flex flex-col items-center hover:animate-pulse cursor-pointer"}>
                            <h1 className="text-gray-900 dark:text-white font-bold text-xl md:text-4xl tracking-tight">
                                DONGSUH
                            </h1>
                            <h3 className="text-gray-900 dark:text-white text-sm md:text-md tracking-tight opacity-50">
                                Accounting Corporation
                            </h3>
                        </div>
                        <div className={"flex flex-col items-center hover:animate-pulse cursor-pointer"}>
                            <h1 className="text-gray-900 dark:text-white font-bold text-xl md:text-4xl tracking-tight">
                                BHSN
                            </h1>
                            <h3 className="text-gray-900 dark:text-white text-sm md:text-md tracking-tight opacity-50">
                                Lawfirm
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
