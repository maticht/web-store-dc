'use client'
import '../AboutStyles.css'
import aboutBg from "@/img/aboutBg.png";
import Image from "next/image";
import React, {useState} from "react";
import FooterErrorBlock from "@/components/modals/footerErrorBlock";

export default function Returns() {
    const [isFooterErrorBlockOpen, setIsFooterErrorBlockOpen] = useState(false);
    const toggleFooterErrorBlock = () => {
        setIsFooterErrorBlockOpen(!isFooterErrorBlockOpen);
    };

    return (
        <div className={'contacts'}>
            {isFooterErrorBlockOpen && (
                <FooterErrorBlock/>
            )}
            <Image className={'contacts-bg-img'} src={aboutBg} alt={''}/>
            <h2 className={'title'}>Возврат</h2>
            <div className={'description-block'}>
                <p className={'description'}>
                    Ваше удовлетворение покупкой - наш приоритет. Если товар не соответствует вашим ожиданиям, мы рады
                    предоставить возможность возврата или обмена в течение трёх дней после получения товара.
                </p>
                <p className={'description'}>
                    Мы понимаем, что при покупке одежды онлайн может возникнуть необходимость в возврате из-за
                    неподходящего
                    размера или других причин. Вы <b>можете вернуть товар</b>, если он не подходит по размеру или вам не
                    понравился. Просим вас сохранить все бирки и ярлыки, чтобы облегчить процесс возврата или обмена.
                </p>
                <p className={'description'}>
                    В случае обнаружения брака, мы осуществляем возврат товара. Перед отправкой все наши товары проходят
                    проверку качества, однако, если возникла проблема, мы заменим или вернем вам средства. Процесс
                    возврата
                    средств или обмена может потребовать <b>проведения проверки</b> для подтверждения брака или
                    неподходящего
                    качества товара.
                </p>
                <div className='footer-error-block'>
                    <p>Необходим возврат товара ?</p>
                    <div className='footer-btns-block'>
                        <button className='footer-error-btn' onClick={toggleFooterErrorBlock}>
                            <p>Сообщить о возврате</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
