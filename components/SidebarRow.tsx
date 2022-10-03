import React ,{SVGProps}from 'react'
interface Props {
    Icon:(props: SVGProps<SVGSVGElement>)=>JSX.Element,
    title:string
    onClick?: ()=>{}
}
function SidebarRow({Icon, title,onClick}:Props) {
  return (
    <div onClick={() => onClick?.()} className="flex items-center space-x-2 px-4 py-3 rounded-full  transition-all duration-100 hover:bg:-gray-100 group cursor-pointer">
      <Icon className="h-6 w-6 hover:text-twitter sm:hover:text-black"/>
      <p className="group-hover:text-twitter hidden md:inline-flex lg:text-xl ">{title}</p>  
    </div>
  )
}

export default SidebarRow