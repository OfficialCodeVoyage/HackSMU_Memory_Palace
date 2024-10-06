const HeroSection: React.FC = () => {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-screen-2xl py-16 lg:px-0">
                <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-12 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-16 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
                    {/* SVG Background for cool effect */}
                    <svg
                        viewBox="0 0 1024 1024"
                        aria-hidden="true"
                        className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
                    >
                        <circle r={512} cx={512} cy={512} fill="url(#gradient)" fillOpacity="0.7" />
                        <defs>
                            <radialGradient id="gradient">
                                <stop stopColor="#7775D6" />
                                <stop offset={1} stopColor="#E935C1" />
                            </radialGradient>
                        </defs>
                    </svg>

                    {/* Text Content */}
                    <div className="mx-auto max-w-lg text-left lg:mx-0 lg:flex-auto lg:py-20 lg:text-left">
                        <h1 className="text-5xl font-bold  text-white">
                            Welcome to Virtual Memory Playground
                        </h1>
                        <p className="mt-4 text-xl text-gray-300">
                            Enhance your memory in engaging environments.
                        </p>
                    </div>

                    {/* Image */}
                    <div className="relative mt-8 h-80 lg:mt-0">
                        <img
                            alt="App screenshot"
                            src="../images/banner.png"
                            width={1824}
                            height={1080}
                            className="absolute left-20 w-[38rem] max-w-none rounded-md ring-white/10 top-[-70px]"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
