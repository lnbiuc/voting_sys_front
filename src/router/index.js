import { createRouter, createWebHistory } from 'vue-router';
import Index from '../view/Index.vue';
import VotingList from '../view/VotIngList.vue';
import Detail from '../view/Detail.vue';
import Result from '../view/Result.vue';
import SignUp from '../view/SignUp.vue';
import Publish from '../view/Publish.vue'
import BaseInfo from '../form/baseInfo.vue'
import Items from '../form/items.vue'
import Submit from '../form/submit.vue'
const routes = [
	{
		path: '/:catchAll(.*)',
		redirect: '/',
	},
	{
		path: '/',
		name: 'index',
		component: Index,
		redirect: '/votingList',
		meta: { title: '首页' },
		children: [
			{
				path: '/votingList',
				name: 'votingList',
				component: VotingList,
				meta: { title: '投票列表' },
			},
			{
				path: '/detail/:votId',
				name: 'detail',
				component: Detail,
				meta: { title: '投票' },
			},
			{
				path: '/result/:votId',
				name: 'result',
				component: Result,
				meta: { title: '结果' },
			},
			{
				path: '/signup',
				name: 'signup',
				component: SignUp,
				meta: { title: '登陆/注册' },
			},
			{
				path: '/publish',
				name: 'publish',
				component: Publish,
				meta: {title: '发布'},
				redirect: '/publish/baseInfo',
				children: [
					{
						path: '/publish/baseInfo',
						name: 'baseInfo',
						component: BaseInfo,
						meta: {title: '基本信息'}
					},
					{
						path: '/publish/items',
						name: 'items',
						component: Items,
						meta: {title: '投票项'}
					},
					{
						path: '/publish/submit/:status',
						name: 'submit',
						component: Submit
					}
				]
			}
		],
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});
router.afterEach(() => {
	window.scrollTo(0, 0);
});

router.beforeEach((to, from, next) => {
	if (to.meta.title) {
		document.title = to.meta.title;
	}
	next();
});

export default router;