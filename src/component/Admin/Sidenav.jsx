import { FaList, FaUser } from 'react-icons/fa';
import { MdDashboard} from 'react-icons/md';
import { Link } from 'react-router-dom';

function Sidenav() {
	
	return (
		<div className="min-h-screen flex flex-row sticky">
			<div className="flex flex-col w-56 bg-slate-200 rounded-r-3xl overflow-hidden">
				<div className="flex items-center justify-center h-16 shadow-md">
					<h1 className="text-3xl  text-red-500">FurnisH</h1>
				</div>
				<ul className="flex flex-col py-4">
					<li>
						<Link to={'/admin'}  className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-black hover:text-gray-800">
							<div className="inline-flex items-center justify-center h-12 w-12 text-lg">
								<MdDashboard/>
							</div>
							<p className="text-sm font-medium">Dashboard</p>
						</Link>
					</li>
					<li >
						<Link to={"/users"} className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-black hover:text-gray-800">
							<div className="inline-flex items-center justify-center h-12 w-12 text-lg">
								<FaUser/>
							</div>
							<p className="text-sm font-medium">Users</p>
						</Link>
					</li>
					<li>
						<Link to={"/products"} className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-black hover:text-gray-800">
							<div className="inline-flex items-center justify-center h-12 w-12 text-lg">
								<FaList/>
							</div>
							<p className="text-sm font-medium">Products</p>
						</Link>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default Sidenav