const Home = () => {
  return (
    <div className="w-full min-h-screen bg-black">
      <div className="w-4/5 min-h-full mx-auto">
        <h1 className="text-white font-bold text-2xl text-center p-3 mb-5">
          Super Merbers
        </h1>
        {/* table */}
        <div>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="text-white">
                  <th>SL</th>
                  <th>Super Hero</th>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>1</th>
                  <td>Cy Ganderton</td>
                  <td>Cy Ganderton</td>
                  <td>Quality Control Specialist</td>
                  <td className="flex items-center gap-2">
                    <div className="btn  btn-outline btn-warning">Update</div>
                    <div className="btn btn-outline btn-error">Delete</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
