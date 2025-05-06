import { Fragment } from 'react'
import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from './Logo'
import { User } from '../types'
import { useQueryClient } from '@tanstack/react-query'

type NavMenuProps = {
    name: User['name']
}

export default function NavMenu({ name }: NavMenuProps) {
    const queryClient = useQueryClient();
    const navigate= useNavigate()

    const logout = () => {
        localStorage.removeItem('AUTH_TOKEN')
        queryClient.invalidateQueries({queryKey:['user']})
        queryClient.clear();
        navigate('/auth/login');
    }

    return (
        <Popover className="relative">
            <PopoverButton className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 pr-2 rounded-lg w-8 h-8 sm:w-10 sm:h-10">
                <Logo />
            </PopoverButton>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <PopoverPanel className="absolute left-full md:left-1/2 z-10 mt-5 flex w-screen lg:max-w-min -translate-x-full  sm:-translate-x-1/2 lg:-translate-x-48">
                    <div className="w-full lg:w-56 shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
                        <p className='block p-2 text-orange-600'>Hola: {name}</p>
                        <Link
                            to='/profile'
                            className='block p-2 hover:text-orange-600 transition-colors'
                        >Mi Perfil</Link>
                        <Link
                            to='/'
                            className='block p-2 hover:text-orange-600 transition-colors'
                        >Mis Contactos</Link>
                        <button
                            className='block p-2 hover:text-orange-600 transition-colors'
                            type='button'
                            onClick={logout}
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </PopoverPanel>
            </Transition>
        </Popover>
    )
}