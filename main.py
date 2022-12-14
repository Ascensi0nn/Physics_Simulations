import pygame
import pygame_menu

# global variables
WIDTH = 1300
HEIGHT = 700
FPS = 60
WIN = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.init()

import proj_motion
import obj_collision
import pendulum
import settings
import gravitation

def start_proj_motion():
    proj_motion.start()

def start_obj_collision():
    obj_collision.start()
    
def start_pendulum():
    pendulum.start()

def start_settings():
    settings.start()

def start_gravitation():
    gravitation.start()

def begin():
    pygame.display.set_caption("Physics Simulations")
    menu = pygame_menu.Menu('Physics Simulations: AP Physics C', WIDTH, HEIGHT, theme=pygame_menu.themes.THEME_SOLARIZED)
    menu.add.button('Projectile Motion Sim', start_proj_motion)
    menu.add.button('Object Collision Sim', start_obj_collision)
    menu.add.button('Pendulum Sim', start_pendulum)
    menu.add.button('Gravitation Sim', start_gravitation)
    menu.add.button('Settings', start_settings)
    menu.add.button('Quit', pygame_menu.events.EXIT)
    menu.mainloop(WIN)


if __name__ == "__main__":
    begin()