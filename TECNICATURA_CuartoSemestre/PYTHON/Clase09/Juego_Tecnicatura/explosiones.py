import pygame
import os
from constantes import ASSETS_PATH

class Explosion:
    def __init__(self, x, y):
        # Construye la ruta completa a las imágenes de la explosion
        self.images = [pygame.image.load(os.path.join(ASSETS_PATH, 'images', f'regularExplosion0{i:02d}.png')) for i in range(9)]
        self.index = 0
        self.image = self.images[self.index]
        self.rect = self.image.get_rect(center=(x, y))
        self.frame_rate = 0 # Contador de los frames de la animación
        self.max_frames = 20 # Frames de la animación

    def actualizar(self):
        # Actualizar la animación
        self.frame_rate += 1
        if self.frame_rate >= self.max_frames:
            self.index += 1
            if self.index >= len(self.images):
                return False # Termina la animación si se han mostrado todas las imágenes
            self.image = self.images[self.index]
            return True

    def dibujar(self, screen):
        # Dibujar la imagen en la pantalla
        screen.blit(self.image, self.rect.topleft)