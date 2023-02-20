import TopBar from '../../features/top-bar';
import ContentLayout from '../../common/layout/content';
import homeGradient from '../../common/gradients/wrk.jpeg';
import { PrimaryButton, WhiteButton } from '../../common/components/Buttons';
import {
  ArrowRightIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from '@heroicons/react/outline';
import { ReactComponent as GithubIcon } from '../../common/icons/github-mark.svg';

const Home = () => {
  return (
    <>
      <TopBar />
      <div className="relative w-full h-[300px] bg-green">
        <img
          src={homeGradient}
          className="absolute inset-0 h-[400px] w-full object-cover z-0"
          alt="Home Gradient"
        />
        <div className="absolute inset-0 flex flex-col ">
          <ContentLayout fullHeight>
            <div className="grid h-screen place-items-center">
             
<form>   
    <label htmlFor="default-search" className="mb-5 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required/>
        <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
</form>

             
              <div className="flex flex-row mt-4 space-x-2">
                
               
              </div>
            </div>
          </ContentLayout>
        </div>
      </div>
      <ContentLayout fullHeight additionalClassnames="mt-8">
        <main className="text-center text-primary">
          <div className="mt-4 mb-8">
            <div className="mt-4 mb-8 text-[31px] font-medium">
              Awesome Features
            </div>
            <div className="text-[16px] flex flex-row justify-center">
              <div className="md:w-3/5">
               
              </div>
            </div>
          </div>
          <div className="pb-12 border-b border-gray-100">
            <div className="grid items-center grid-cols-1 mt-12 gap-x-4 gap-y-8 lg:grid-cols-3 overflow-wrap">
              <div className="flex flex-col items-center justify-center col-span-1">
                <div className="flex flex-col items-center justify-center p-2 mb-4 border border-gray-100 rounded-lg shadow-sm bg-gray-50">
                  <SparklesIcon
                    className="w-8 h-8 text-indigo-500"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="text-[24px] font-semibold">Feature Rich</h3>
                <p className="text-[16px]">
                  This Homepage is sparkling for your delight
                </p>
              </div>
              <div className="flex flex-col items-center justify-center col-span-1">
                <div className="flex flex-col items-center justify-center p-2 mb-4 border border-gray-100 rounded-lg shadow-sm bg-gray-50">
                  <ShieldCheckIcon
                    className="w-8 h-8 text-indigo-500"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="text-[24px] font-semibold">Secure</h3>
                <p className="text-[16px]">This Homepage is secure</p>
              </div>
              <div className="flex flex-col items-center justify-center col-span-1">
                <div className="flex flex-col items-center justify-center p-2 mb-4 border border-gray-100 rounded-lg shadow-sm bg-gray-50">
                  <LightBulbIcon
                    className="w-8 h-8 text-indigo-500"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="text-[24px] font-semibold">New Ideas</h3>
                <p className="text-[16px]">This homepage is full of ideas</p>
              </div>
            </div>
          </div>
         
        </main>
      </ContentLayout>
    </>
  );
};

export default Home;
