import {
	useQuery,
	useMutation,
} from '@tanstack/react-query'
import axios from 'axios'
import React, { Fragment } from 'react'
import { Bar } from 'react-chartjs-2'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { useReactQuerySubscription } from 'Hooks/useReactQuerySubscription';


ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: 'top',
		},
		title: {
			display: true,
			text: 'Sales Bar Chart',
		},
	},
};

export default function Graph() {
	const websocket = useReactQuerySubscription()

	const query = useQuery({
		queryKey: ['products'], queryFn: async () => {
			const { data } = await axios.get(
				'http://localhost:3002/products',
			)
			return data
		},
	})

	const mutation = useMutation({
		mutationFn: async () => {
			const index = Math.floor(Math.random() * query.data.length);
			await axios.put(`http://localhost:3002/products/${query.data[index].id}`,
				{ ...query.data[index], sales: Math.floor(Math.random() * 15000) })
		},
		onSuccess: () => {
			websocket.send(JSON.stringify({ queries: ["products"] }))
		}
	})

	return (
		<div style={{ width: "100%" }}>
			{query.isLoading ? <span>Loading</span> : (
				<div className='graph-wrapper'>
					<Bar
						data={{
							labels: query.data.map((product) => product.name),
							datasets: [
								{
									label: "Sales",
									data: query.data.map((product) => product.sales),
									backgroundColor: 'green'
								}
							]
						}} />
					<div className='flexbox center'>
						<button className='button-3' onClick={() => {
							mutation.mutate()
						}}
						>
							Edit random product sales
						</button>
					</div>
				</div>
			)}
		</div>
	)
}