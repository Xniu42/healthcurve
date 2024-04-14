export default function Header() {
  return (
    <header className="flex flex-col item-center py-10">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 mt-10">Welcome to Health Curve</h1>
      
      <div className="max-w-3xl text-center mb-12">
        <p className="text-xl md:text-2xl mb-6 leading-relaxed">
          Take control of your health with Health Curve. 
        </p>
        <p className="text-xl md:text-2xl mb-6 leading-relaxed">
          Easily track your key health indicators, gain valuable insights, and empower yourself to manage chronic conditions more effectively.
        </p>
      </div>
      
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-4">With Health Curve, you can:</h2>
        <ul className="list-disc list-inside text-xl space-y-4 max-w-3xl text-left">
          <li>Effortlessly log and monitor your health data</li>
          <li>Receive easy-to-understand interpretations of your health indicators</li>  
          <li>Identify trends and patterns in your health metrics</li>
        </ul>
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-6">Explore Health Curve:</h2>
        <div className="text-xl md:flex md:justify-around max-w-4xl">
          <div className="mb-4 md:mb-0 md:text-center">
            <span className="text-3xl mr-2">{'\uD83D\uDCCB'}</span>  
            <span>Indicators: Easily track and manage your key health indicators</span>
          </div>
          <div className="mb-4 md:mb-0 md:text-center">
            <span className="text-3xl mr-2">{'\uD83D\uDCC8'}</span>
            <span>Landscape: Visualize your health metrics with insightful charts</span> 
          </div>
          <div className="md:text-center">
            <span className="text-3xl mr-2">{'\uD83D\uDCDA'}</span>
            <span>Story: Discover the stories behind your data - get personalized health insights and advice</span>
          </div>
        </div>
      </div>
    </header>
  );
}