import { SideBar } from "./components/side-bar";

import { useParams } from "react-router-dom";
import { SectionPosts } from "./sections/posts";
import { SectionBusiness } from "./sections/business";

export const Dashboard = (): JSX.Element => {
  const { section } = useParams();

  return (
    <div className="flex min-h-full flex-1 justify-center px-6 py-12 lg:px-8">
      <SideBar />
      <div className="w-full">
        {section === 'posts' && <SectionPosts/>}
        {section === 'business' && <SectionBusiness/>}
      </div>
    </div>
  );
};
