'use client';

import { useState } from 'react';
import {
    Dialog,
    PopoverGroup,
} from '@headlessui/react';
import {
    HomeModernIcon,  // Changed HomeIcon to HomeModernIcon
    InformationCircleIcon,
    BookOpenIcon,
    ComputerDesktopIcon,  // Changed CodeBracketIcon to ComputerDesktopIcon
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline';  // Ensure correct import for new icons
import Link from 'next/link';
import {DiGithub} from "react-icons/di";
import {GrGithub} from "react-icons/gr";

const Header: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="bg-gray-70 shadow">
            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                {/* Removed the logo section */}
                <div className="hidden lg:flex flex-1 justify-center items-center">
                    <PopoverGroup className="flex gap-x-12 justify-center items-center">
                        <Link href="/" className="text-[23px] font-semibold leading-6 text-gray-900 flex items-center gap-2">
                            <HomeModernIcon className="h-7 w-7" aria-hidden="true" />
                            Main Page
                        </Link>
                        <Link href="/about" className="text-[23px] font-semibold leading-6 text-gray-900 flex items-center gap-2">
                            <InformationCircleIcon className="h-7 w-7" aria-hidden="true" />
                            About Software
                        </Link>
                        <Link href="/instruction" className="text-[23px] font-semibold leading-6 text-gray-900 flex items-center gap-2">
                            <BookOpenIcon className="h-7 w-7" aria-hidden="true" />
                            Instruction How To ...
                        </Link>
                        <a
                            href="https://github.com/OfficialCodeVoyage/HackSMU_Memory_Prevention"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[23px] font-semibold leading-6 text-gray-900 flex items-center gap-2"
                        >
                            <GrGithub className="h-7 w-7" aria-hidden="true" />
                            GitHub
                        </a>
                    </PopoverGroup>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="h-7 w-7" />
                    </button>
                </div>
            </nav>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="h-7 w-7" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <Link
                                    href="/"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-[23px] font-semibold leading-7 text-gray-900 flex items-center gap-2 hover:bg-gray-50"
                                >
                                    <HomeModernIcon className="h-7 w-7" aria-hidden="true" />
                                    Home
                                </Link>
                                <Link
                                    href="/about"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-[23px] font-semibold leading-7 text-gray-900 flex items-center gap-2 hover:bg-gray-50"
                                >
                                    <InformationCircleIcon className="h-7 w-7" aria-hidden="true" />
                                    About Software
                                </Link>
                                <Link
                                    href="/instruction"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-[23px] font-semibold leading-7 text-gray-900 flex items-center gap-2 hover:bg-gray-50"
                                >
                                    <BookOpenIcon className="h-7 w-7" aria-hidden="true" />
                                    Instruction
                                </Link>
                                <a
                                    href="https://github.com/your-repo-link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-[23px] font-semibold leading-7 text-gray-900 flex items-center gap-2 hover:bg-gray-50"
                                >
                                    <ComputerDesktopIcon className="h-7 w-7" aria-hidden="true" />
                                    GitHub
                                </a>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    );
};

export default Header;
