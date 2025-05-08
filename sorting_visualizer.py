import pygame
import random
import time

# Constants
SCREEN_WIDTH = 910
SCREEN_HEIGHT = 750
ARR_SIZE = 130
RECT_SIZE = 7

# Initialize
arr = [random.randint(10, SCREEN_HEIGHT) for _ in range(ARR_SIZE)]

pygame.init()
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("Sorting Visualizer")
clock = pygame.time.Clock()

def draw_array(highlight_indices=[]):
    screen.fill((0, 0, 0))  # Clear screen
    for i in range(ARR_SIZE):
        color = (170, 183, 184)  # Default color
        if i in highlight_indices:
            color = (165, 105, 189) if i == highlight_indices[0] else (100, 180, 100)
        pygame.draw.rect(screen, color, (i * RECT_SIZE, SCREEN_HEIGHT - arr[i], RECT_SIZE, arr[i]))
    pygame.display.flip()

def selection_sort():
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
            draw_array([i, min_idx])
            pygame.time.delay(10)
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
        draw_array([i])
        pygame.time.delay(10)

def main():
    draw_array()
    time.sleep(1)  # Pause briefly before sorting
    selection_sort()

    # Pause to show result, then quit
    draw_array()
    time.sleep(2)
    pygame.quit()

if __name__ == "__main__":
    main()
