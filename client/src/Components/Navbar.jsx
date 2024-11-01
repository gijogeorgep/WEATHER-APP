function Navbar() {
  return (
    <>
      <nav className="sticky top-0 h-20 w-full flex justify-start items-center bg-gradient-to-r from-white/20 to-transparent backdrop-blur-md shadow-lg border border-white/30 rounded-lg z-10">
        <h1 className="text-5xl font-mono text-[#FFC0CB] font-bold mt-3 ml-5 drop-shadow-lg">
          Weather now.
        </h1>
      </nav>
    </>
  );
}

export default Navbar;
