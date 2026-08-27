function Loader({ fullScreen = true }) {
  return (
    <div
      className={`flex items-center justify-center ${
        fullScreen ? "h-screen" : "h-full py-10"
      }`}
    >
      <div className="w-10 h-10 border-4 border-gray-200 border-t-[#D85A30] rounded-full animate-spin" />
    </div>
  );
}

export default Loader;