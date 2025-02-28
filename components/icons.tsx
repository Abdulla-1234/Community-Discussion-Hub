import { LucideProps, MessageSquare, User, BarChart, Settings, Vote, Users, PieChart } from "lucide-react";

export type IconProps = LucideProps;

export const Icons = {
  logo: (props: IconProps) => (
    <PieChart {...props} />
  ),
  user: User,
  post: MessageSquare,
  poll: Vote,
  chart: BarChart,
  settings: Settings,
  users: Users,
};