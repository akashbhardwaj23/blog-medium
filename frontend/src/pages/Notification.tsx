import Appbar from "../components/Appbar";

function Notification() {
  return (
    <div>
      <Appbar />
      <div className="flex flex-col justify-evenly py-12 h-screen pl-16 max-w-3xl">
        <div className="text-5xl font-bold">Notification</div>
        <div className="pt-12 border-b border-slate-500 pb-4">
          <span className="mr-4">All</span> <span>Response</span>
        </div>

        <div className="h-full flex justify-center items-center">
          <img src="/icon.svg" alt="icon" className="w-10 h-10" />
        </div>
      </div>
    </div>
  );
}

export default Notification;
