import { Loadsdata } from "@/components/columns";
import EnterInformation_Form from "@/components/EnterInformation_Form";
import LoadDataTable from "@/components/LoadDataTable";

const LoadBoardPage = () => {
  return (
    <div className="max-w-[1589px] mx-auto flex flex-col h-screen mt-5 space-y-5">
      <EnterInformation_Form />
      <div className="flex items-center justify-between mx-auto">
        <LoadDataTable data={Loadsdata} />
      </div>
    </div>
  );
};

export default LoadBoardPage;
