import './Meteor.styl' // 导入流星的样式文件

import React, { useEffect, useState } from 'react'

interface MeteorProps {
  size: 'small' | 'medium' | 'large'
  speed: number
  direction: 'left' | 'right'
  index: number
}

const Meteor: React.FC<MeteorProps> = ({ size, speed, direction, index }) => {
  // const [top, setTop] = useState(Math.random() * 100) // 随机初始位置

  // useEffect(() => {
  //   const meteor: any = document.getElementById(`meteor${index}`)
  //   const containerWidth = window.innerWidth

  //   const animateMeteor = () => {
  //     // 根据流星的方向和速度计算动画细节
  //     const distance = containerWidth + 100 // 流星从屏幕外初始位置到屏幕外结束位置的距离
  //     const animationDuration = distance / speed // 动画持续时间

  //     // 设置流星的初始位置和动画效果
  //     meteor.style.top = `${top}vh`
  //     meteor.style.animationDuration = `${animationDuration}s`
  //     meteor.style.animationDelay = `${Math.random()}s`

  //     // 在动画结束后重新启动动画
  //     meteor.addEventListener('animationend', animateMeteor)
  //   }

  //   animateMeteor()

  //   // 在组件卸载时清除事件监听器
  //   return () => {
  //     meteor.removeEventListener('animationend', animateMeteor)
  //   }
  // }, [top, speed])

  return (
    <div className={`meteor-cont meteor-cont-${size}`}>
      <div className="meteor-ani">
        <div id={`meteor${index}`} className="meteor_" />
      </div>
    </div>
  )
}

const MeteorShower: React.FC = () => {
  return (
    <div className="meteor-shower">
      <Meteor index={0} size="small" speed={3} direction="left" />
      <Meteor index={1} size="medium" speed={5} direction="right" />
      <Meteor index={2} size="large" speed={7} direction="left" />
    </div>
  )
}

export default MeteorShower
