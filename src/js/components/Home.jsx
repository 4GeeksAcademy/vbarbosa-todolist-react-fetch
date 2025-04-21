import React, { useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { List } from "./List";

//create your first component
const Home = () => {

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-12 col-lg-12 mx-auto justify-content-center">
					<div className="title">todos</div>
					<div className="container w-100 border-0">
						<div className="row">
							<div className="col-12 col-lg-6 mx-auto">
								<List />
								<div className=" footer2 mx-1"></div>
                    			<div className="footer3 mx-2"></div>
							</div>
						</div>
        			</div>
				</div>
			</div>
		</div>
	);
};

export default Home;