import bgImage from "../../assets/kids.jpeg";

const Background = () => {
  return (
    <>
      {/* لایه بک‌گراند */}
      <div
        className="hidden sm:block absolute inset-x-0 top-[100px] -z-10 bg-cover bg-center h-[300px]"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="ml-9 mt-20 text-slate-50 font-bold">
          <h1 className="text-5xl">Welcome.</h1>
          <h3 className="text-white text-2xl mt-2">
            Millions of movies, TV shows and people to discover. Explore now.
          </h3>
        </div>
      </div>
    </>
  );
};

export default Background;
