import { Link } from "react-router-dom";
import {
  Package2Icon,
  PieChartIcon,
  RecycleIcon,
  TruckIcon,
} from "lucide-react";
import image from "@/assets/image.jpg";

export default function Component() {
  return (
    <>
      <header className="flex items-center justify-between h-16 px-4 md:px-6">
        <Link className="flex items-center gap-2 font-semibold" to="#">
          <Package2Icon className="h-6 w-6" />
          <span className="">EcoSync</span>
        </Link>
        <div className="flex items-end gap-4">
          <Link
            className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            to="/login"
          >
            Login
          </Link>
        </div>
      </header>
      <section className="w-full py-12 md:py-12 lg:py-12 xl:py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Streamline Your Waste Management
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Our cutting-edge garbage collection management system helps
                  you optimize your operations, reduce costs, and improve
                  sustainability.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  to="/login"
                >
                  Get Started
                </Link>
              </div>
            </div>
            <img
              alt="Hero"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom object-contain lg:order-last lg:aspect-square"
              height="550"
              src={image}
              width="550"
            />
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <TruckIcon className="h-12 w-12 text-gray-900 dark:text-gray-50" />
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Efficient Collection</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Our advanced route optimization algorithms ensure your trucks
                  collect waste efficiently, reducing fuel costs and emissions.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <RecycleIcon className="h-12 w-12 text-gray-900 dark:text-gray-50" />
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Increased Recycling</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Our system helps you track and optimize your recycling
                  efforts, leading to higher diversion rates and a greener
                  community.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <PieChartIcon className="h-12 w-12 text-gray-900 dark:text-gray-50" />
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Insightful Analytics</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Our comprehensive reporting and analytics tools provide
                  valuable insights to help you optimize your operations and
                  reduce costs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Experience the Future of Waste Management
            </h2>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Our cutting-edge garbage collection management system helps you
              optimize your operations, reduce costs, and improve
              sustainability.
            </p>
          </div>
        </div>
      </section>
      <footer className="w-full bg-gray-900 py-6 text-gray-50 dark:bg-gray-800">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
          <div className="flex items-center gap-2">
            <Package2Icon className="h-6 w-6" />
            <span className="font-semibold">Acme Inc</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link className="text-sm hover:underline" to="#">
              Privacy
            </Link>
            <Link className="text-sm hover:underline" to="#">
              Terms
            </Link>
            <Link className="text-sm hover:underline" to="#">
              Contact
            </Link>
          </nav>
          <p className="text-sm">© 2024 EcoSync. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
