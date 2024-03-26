import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiFillCustomerService, AiOutlineCaretDown, AiOutlineHistory } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { convertToSlug } from '../../utils/convertToSlug';


const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [, setSelectedLanguage] = useState('');
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();


    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const selectLanguage = (language: string) => {
        setSelectedLanguage(language);
        setIsOpen(false);
        changeLanguage(language);
    };


    const handleClick = (slug: string) => {
        navigate(`danh-sach/${convertToSlug(t(slug))}`, { state: { slug } });
    };

    return (
        <header className="bg-[#EDFFFA]">
            <div className="mx-auto max-w-screen-xl px-8 py-2">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-12">
                        <a className="block text-teal-600" href="#">
                            <span className="sr-only">Home</span>
                            <svg className="h-8" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </a>
                    </div>
                    <div className="flex items-center justify-center gap-6">
                        {/* <div className="relative">
                            <input type="text" className="h-10 pl-10 border border-gray-100 pr-10 rounded-full text-sm focus:outline-none" placeholder={t('search')} />
                            <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
                                <span className='hidden'>a</span>
                                <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966" width="512px" height="512px">
                                    <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92c0.779,0,1.518-0.297,2.079-0.837  C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17s-17-7.626-17-17S14.61,6,23.984,6z" />
                                </svg>
                            </button>
                        </div> */}
                        <button className='text-start leading-5' onClick={() => handleClick('specialty')}>
                            <p className='text-[13px] font-bold'>{t('header.specialty')}</p>
                            <p className='text-[10px]'>{t('header.searchDoctor')}</p>
                        </button>
                        <a href="" className='text-start leading-5' onClick={() => handleClick('clinics')}>
                            <p className='text-[13px] font-bold'>{t('header.medFacilities')}</p>
                            <p className='text-[10px]'>{t('header.hospital')}</p>
                        </a>
                        <a href="" className='text-start leading-5' onClick={() => handleClick('doctor')}>
                            <p className='text-[13px] font-bold'>{t('header.doctor')}</p>
                            <p className='text-[10px]'>{t('header.choosingDoctor')}</p>
                        </a>
                        <a href="" className='text-start leading-5'>
                            <p className='text-[13px] font-bold'>{t('header.package')}</p>
                            <p className='text-[10px]'>{t('header.generalEx')}</p>
                        </a>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex gap-4 items-center">
                            <a className="" href="#">
                                <AiFillCustomerService className="text-[#45C3D2] text-4xl" />
                            </a>
                            <a className="" href='/lich-hen'>
                                <AiOutlineHistory className="text-[#45C3D2] text-4xl" />
                            </a>
                            <div className="relative">
                                <button className="flex gap-1 items-center p-2 " onClick={toggleDropdown}>
                                    <img
                                        src={i18n.language === 'en' ? 'https://kenh14cdn.com/2017/5-1503128133747.png' : 'https://th.bing.com/th?id=OSK.e1790c55fb0493ee09dba2fc418bff07&w=188&h=132&c=7&o=6&dpr=1.3&pid=SANGAM'}
                                        alt=""
                                        className="w-6 h-4 object-cover"
                                    />
                                    <AiOutlineCaretDown className="text-[#45C3D2]" />
                                </button>
                                {isOpen && (
                                    <div className="absolute top-full left-0 mt-2 bg-white rounded shadow border border-gray-200">
                                        <button className="flex gap-1 items-center p-2 hover:bg-gray-100" onClick={() => selectLanguage('en')}>
                                            <img src="https://kenh14cdn.com/2017/5-1503128133747.png" alt="" className="w-6 h-4 object-cover" />
                                        </button>
                                        <button className="flex gap-1 items-center p-2 hover:bg-gray-100" onClick={() => selectLanguage('vi')}>
                                            <img src="https://th.bing.com/th?id=OSK.e1790c55fb0493ee09dba2fc418bff07&w=188&h=132&c=7&o=6&dpr=1.3&pid=SANGAM" alt="" className="w-6 h-4 object-cover" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>

    );
};

export default Header;
