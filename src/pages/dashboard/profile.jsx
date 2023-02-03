import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Switch,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import { platformSettingsData, conversationsData, projectsData } from "@/data";

export function Profile() {
  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-blue-500/50" />

      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
        <CardBody className="p-4">
          
          <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
              <div className="relative">  
              <Avatar  class="rounded w-36 h-36" src="https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="avatar" size="xxl" />
            
              </div>
            </div>
            <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
              <div className="py-6 px-3 mt-32 sm:mt-0">
                <button className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                  Connect
                </button>
              </div>
            </div>
            <div className="w-full lg:w-4/12 px-4 lg:order-1">
              <div className="flex justify-center py-4 lg:pt-4 pt-8">
                <div className="mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">22</span><span className="text-sm text-blueGray-400">Friends</span>
                </div>
                <div className="mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">10</span><span className="text-sm text-blueGray-400">Photos</span>
                </div>
                <div className="lg:mr-4 p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">89</span><span className="text-sm text-blueGray-400">Comments</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
              Yagnik Patel
            </h3>
            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
              <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
              Los Angeles, California
            </div>
            <div className="mb-2 text-blueGray-600 mt-10">
              <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>Solution Manager - Creative Tim Officer
            </div>
            <div className="mb-2 text-blueGray-600">
              <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>University of Computer Science
            </div>
          </div>
          <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-9/12 px-4">
                <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                  An artist of considerable range, Jenna the name taken by
                  Melbourne-raised, Brooklyn-based Nick Murphy writes,
                  performs and records all of his own music, giving it a
                  warm, intimate feel with a solid groove structure. An
                  artist of considerable range.
                </p>
              </div>
            </div>
            
          </div>
        </div>
        <div className="container mx-auto px-4">
    <body>
  
                  <div class="bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 px-4 py-5 border-b rounded-t sm:px-6">
                    <h3 class="text-lg leading-6 font-medium text-white">
                    Booking List
                    </h3>
                  </div>
                  <div class="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul class="divide-y divide-gray-200">
                      <li>
                        <a class="block hover:bg-gray-50">
                          <div class="px-4 py-4 sm:px-6">
                            <div class="flex items-center justify-between">
                              <p class="text-sm font-thin text-gray-700 truncate">
                                Increase sales by 10% year over year
                              </p>
                            
                              <button   onClick={()=>setShowBooking(true)} class="hover:bg-gray-200  bg-gray-100     outline-none focus:outline-none font-semibold py-2 px-4  rounded-full">
    View Details
  </button>
    
                            </div>
                            <div class="mt-2 sm:flex sm:justify-between">
                              <div class="sm:flex">
                                <p class="flex items-center text-sm font-light text-gray-500">
                                  <time datetime="2020-01-07">January 7, 2020</time>
                                </p>
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                  
                <li>
                        <a class="block hover:bg-gray-50">
                          <div class="px-4 py-4 sm:px-6">
                            <div class="flex items-center justify-between">
                              <p class="text-sm font-thin text-gray-700 truncate">
                                Increase newsletter subscribers by 500
                              </p>
                                
                              <button class="hover:bg-gray-200  bg-gray-100   outline-none focus:outline-none font-semibold py-2 px-4  rounded-full">
    View Details
  </button>
                            </div>
                            <div class="mt-2 sm:flex sm:justify-between">
                              <div class="sm:flex">
                                <p class="flex items-center text-sm font-light text-gray-500">
                                  <time datetime="2020-01-07">January 7, 2020</time>
                                </p>
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                  
              <li>
                        <a class="block hover:bg-gray-50">
                          <div class="px-4 py-4 sm:px-6">
                            <div class="flex items-center justify-between">
                              <p class="text-sm font-thin text-gray-700 truncate">
                                Increase customer satisfaction rating by 10 points 
                              </p>
                                
                              <button class="hover:bg-gray-200  bg-gray-100  outline-none focus:outline-none font-semibold py-2 px-4  rounded-full">
    View Details
  </button>
                            </div>
                            <div class="mt-2 sm:flex sm:justify-between">
                              <div class="sm:flex">
                                <p class="flex items-center text-sm font-light text-gray-500">
                                  <time datetime="2020-01-07">January 7, 2020</time>
                                </p>
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                    </ul>

                  </div>
                </body>
              </div>
        </CardBody>
      </Card>
    </>
  );
}

export default Profile;