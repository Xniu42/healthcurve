// NavBar.tsx
import HomeButton from './HomeButton';
import MetricDataButton from './MetricDataButton'; 
import MetricStoryButton from './MetricStoryButton';
import MetricLandscapeButton from './MetricLandscapeButton';
import AuthButton from './AuthButton';

export default function NavBar() {
    return (
        
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
            <HomeButton />
            <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm ">
              
                <MetricDataButton />
              
            <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
              
               <MetricLandscapeButton  />
               
              <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
            <MetricStoryButton />
            </div>
            </div>
          </div>   
          <div >
           <AuthButton />
          </div>
        </div> 
      </nav>
        
    );
  }