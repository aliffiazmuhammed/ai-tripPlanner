import { FormEnquiry } from '../ui-components/form'
import './App.css'

function App() {

  return (
    <div className="flex flex-col gap-4 min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="form">
        <FormEnquiry />
      </div>
    </div>
  );
}

export default App
