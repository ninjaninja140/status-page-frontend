import { AlertCircle, CheckmarkCircle, CloseCircle } from '@styled-icons/ionicons-solid';
import type { StyledIcon } from '@styled-icons/styled-icon';
import { useEffect, useState } from 'react';
import { Fragment } from 'react/jsx-runtime';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordion.tsx';
import { cn } from '../../lib/utils.ts';

enum ElementType {
	Group = 1,
	Site = 2,
}

interface SiteGroup {
	type: ElementType.Group;
	label: string;
	sites: Array<{
		label: string;
		url: string;
	}>;
}

interface Site {
	type?: ElementType.Site;
	label: string;
	url: string;
}

type SiteArray = SiteGroup | Site;

const pageList: Array<SiteArray> = [
	{ label: 'Docker Registry', url: 'https://docker.io' },
	{
		label: 'jaDevelopment Services',
		type: ElementType.Group,
		sites: [{ label: 'jaDevelopment Website', url: 'https://jadevelopment.co.uk' }],
	},
	{
		label: 'NN140 Services',
		type: ElementType.Group,
		sites: [
			{ label: 'NN140.UK Website', url: 'https://nn140.uk' },
			{ label: 'Bracketed Softworks', url: 'https://bracketed.co.uk' },
		],
	},
];

export default function Page() {
	const [status, setStatus] = useState<{
		state: 'operational' | 'disrupted' | 'down';
		icon: StyledIcon;
		message: string;
		color: {
			col: 'text-green-400' | 'text-red-400' | 'text-amber-400';
			bg: 'bg-green-800' | 'bg-red-800' | 'bg-amber-800';
		};
	}>({
		icon: CheckmarkCircle,
		message: 'All services are operational',
		state: 'operational',
		color: { bg: 'bg-green-800', col: 'text-green-400' },
	});
	const [updated, setTime] = useState<string>('loading...');

	useEffect(() => {
		const date = new Date();

		const formatter = new Intl.DateTimeFormat('en-GB', {
			month: 'short',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			hour12: true,
			timeZoneName: 'short',
		});

		const parts = formatter.formatToParts(date);
		const get = (type: Intl.DateTimeFormatPartTypes): string => parts.find((p) => p.type === type)?.value ?? '';
		const formatted =
			`${get('month')} ${get('day')} at ` +
			`${get('hour')}:${get('minute')} ` +
			`${get('dayPeriod')} ${get('timeZoneName')}`;

		setTime(formatted);
	}, []);

	useEffect(() => {
		const extractUrls = (items: SiteArray[]): string[] =>
			items.flatMap((item) => {
				if ('sites' in item) return item.sites.map((s) => s.url);
				return item.url;
			});

		const ping = async (url: string): Promise<boolean> => {
			try {
				await fetch(url, {
					method: 'HEAD',
					mode: 'no-cors',
					cache: 'no-store',
				});
				return true;
			} catch {
				return false;
			}
		};

		const checkStatus = async () => {
			const urls = extractUrls(pageList);

			const results = await Promise.all(urls.map(ping));
			const successCount = results.filter(Boolean).length;

			if (successCount === 0)
				setStatus({
					state: 'down',
					message: 'Services are down',
					icon: CloseCircle,
					color: { bg: 'bg-red-800', col: 'text-red-400' },
				});
			else if (successCount === urls.length)
				setStatus({
					state: 'operational',
					message: 'All services are operational',
					icon: CheckmarkCircle,
					color: { bg: 'bg-green-800', col: 'text-green-400' },
				});
			else
				setStatus({
					state: 'disrupted',
					message: 'Some services are disrupted',
					icon: AlertCircle,
					color: { bg: 'bg-amber-800', col: 'text-amber-400' },
				});
		};

		checkStatus();
	}, []);

	return (
		<Fragment>
			<div className='flex flex-col gap-12 items-center px-[34rem] py-48'>
				<div className='flex flex-col gap-4 items-center'>
					<status.icon
						className={cn('h-10 aspect-square rounded-full p-0.5', status.color.col, status.color.bg)}
					/>
					<span className='text-3xl font-semibold'>{status.message}</span>
					<span className='font-medium text-muted'>Last updated on {updated}</span>
				</div>
				<Accordion
					defaultValue='item-0'
					type='single'
					collapsible
					className='flex flex-col w-full bg-secondary border-border border-1 rounded-xl p-3 gap-3'
				>
					{pageList
						.filter((p) => p.type === ElementType.Group)
						.map((r, idx) => (
							<AccordionItem value={`item-${idx}`} key={idx}>
								<AccordionTrigger>{r.label}</AccordionTrigger>
								<AccordionContent>
									{r.sites.map((site) => (
										<div className='flex'>
											<span className='flex-1'>{site.label}</span>
										</div>
									))}
								</AccordionContent>
							</AccordionItem>
						))}
				</Accordion>
			</div>
		</Fragment>
	);
}
