'use client'
import '../AboutStyles.css'
import React, {useState} from "react";
import FooterErrorBlock from "@/components/footerErrorBlock";
import FooterCooperationBlock from "@/components/footerCooperationBlock";
import aboutBg from "@/img/aboutBg.png";
import Image from "next/image";

export default function Contacts() {
    const [isFooterErrorBlockOpen, setIsFooterErrorBlockOpen] = useState(false);
    const [isFooterCooperationBlockOpen, setIsFooterCooperationBlockOpen] = useState(false);
    const toggleFooterErrorBlock = () => {
        setIsFooterErrorBlockOpen(!isFooterErrorBlockOpen);
        setIsFooterCooperationBlockOpen(false);
    };

    const toggleFooterCooperationBlock = () => {
        setIsFooterCooperationBlockOpen(!isFooterCooperationBlockOpen);
        setIsFooterErrorBlockOpen(false);
    };
    return (
        <div className={'contacts'}>
            {isFooterErrorBlockOpen && (
                <FooterErrorBlock/>
            )}
            {isFooterCooperationBlockOpen && (
                <FooterCooperationBlock/>
            )}
            <Image src={aboutBg} alt={''}/>
            <h2 className={'title'}>Контакты</h2>
            <div className={'contact-data-block'}>
                <p className={'contact-data'}><b>Наш адрес:</b> ул. Название, город, Почтовый индекс</p>
                <p className={'contact-data'}><b>Телефон:</b> +123456789</p>
                <p className={'contact-data'}><b>Email:</b> info@example.com</p>
                <p className={'contact-data'}><b>График работы:</b> Пн-Пт, 9:00-18:00</p>
            </div>

            <div className='footer-error-block'>
                <p>Свяжитесь с нами</p>
                <div className='footer-btns-block'>
                    <button className='footer-error-btn' onClick={toggleFooterErrorBlock}>
                        <p>Сообщить об ошоибке</p>
                    </button>
                    <button className='footer-cooperation-btn' onClick={toggleFooterCooperationBlock}>
                        <p>Предложение о сотрудничестве</p>
                    </button>
                </div>
            </div>
        </div>
    );
}
