<?php

namespace App\Controller\Admin;

use App\Admin\SampleData;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

/**
 * VIEW-ONLY admin pages. No database, no security, no form handling.
 * Every action just renders a template with sample data.
 */
#[Route('/admin')]
final class AdminController extends AbstractController
{
    #[Route('', name: 'admin_index')]
    public function index(): Response
    {
        return $this->redirectToRoute('admin_dashboard');
    }

    #[Route('/dashboard', name: 'admin_dashboard')]
    public function dashboard(): Response
    {
        return $this->render('admin/dashboard.html.twig', SampleData::dashboard());
    }

    #[Route('/reservations', name: 'admin_reservations')]
    public function reservations(Request $request): Response
    {
        $filter = $request->query->get('filter', 'upcoming');

        return $this->render('admin/reservations.html.twig', [
            'filter' => in_array($filter, ['upcoming', 'past', 'all'], true) ? $filter : 'upcoming',
            'reservations' => SampleData::reservations(),
            'availability_slots' => SampleData::availabilitySlots(),
            'conflict_slots' => SampleData::conflictSlots(),
            'max_tables' => SampleData::MAX_TABLES,
            'slot_minutes' => SampleData::SLOT_MINUTES,
            'guests_per_table' => SampleData::GUESTS_PER_TABLE,
        ]);
    }

    #[Route('/artists', name: 'admin_artists')]
    public function artists(): Response
    {
        $event = SampleData::activeEvent();

        return $this->render('admin/artists.html.twig', [
            'event' => $event,
            'remaining_slots' => $event['max_artists'] - $event['approved_count'],
            'artists' => SampleData::artists(),
        ]);
    }

    #[Route('/artworks', name: 'admin_artworks')]
    public function artworks(): Response
    {
        $all = SampleData::artworks();
        $by = fn (string $s) => array_values(array_filter($all, fn ($a) => $a['status'] === $s));

        return $this->render('admin/artworks.html.twig', [
            'pending' => $by('Pending'),
            'approved' => $by('Approved'),
            'rejected' => $by('Rejected'),
        ]);
    }

    #[Route('/artworks/add', name: 'admin_artwork_add')]
    public function artworkAdd(): Response
    {
        return $this->render('admin/artwork_add.html.twig', ['artist_name' => 'Artist Name']);
    }

    #[Route('/products', name: 'admin_products')]
    public function products(Request $request): Response
    {
        $category = $request->query->get('category', 'Coffee');
        if (!in_array($category, SampleData::PRODUCT_CATEGORIES, true)) {
            $category = 'Coffee';
        }

        $all = SampleData::products();
        $counts = [];
        foreach (SampleData::PRODUCT_CATEGORIES as $cat) {
            $counts[$cat] = count(array_filter($all, fn ($p) => $p['category'] === $cat));
        }

        return $this->render('admin/products.html.twig', [
            'categories' => SampleData::PRODUCT_CATEGORIES,
            'active_category' => $category,
            'category_counts' => $counts,
            'products' => array_values(array_filter($all, fn ($p) => $p['category'] === $category)),
        ]);
    }

    #[Route('/products/add', name: 'admin_product_add')]
    public function productAdd(Request $request): Response
    {
        return $this->render('admin/product_form.html.twig', [
            'mode' => 'add',
            'categories' => SampleData::PRODUCT_CATEGORIES,
            'product' => ['category' => $request->query->get('category', 'Coffee'), 'name' => '', 'desc' => '', 'price' => '', 'image' => null],
        ]);
    }

    #[Route('/products/{id}/edit', name: 'admin_product_edit', requirements: ['id' => '\d+'])]
    public function productEdit(int $id): Response
    {
        $product = SampleData::product($id) ?? throw $this->createNotFoundException('Sample product not found.');

        return $this->render('admin/product_form.html.twig', [
            'mode' => 'edit',
            'categories' => SampleData::PRODUCT_CATEGORIES,
            'product' => $product,
        ]);
    }

    #[Route('/events', name: 'admin_events')]
    public function events(): Response
    {
        return $this->render('admin/events.html.twig', ['events' => SampleData::events()]);
    }

    #[Route('/events/add', name: 'admin_event_add')]
    public function eventAdd(): Response
    {
        return $this->render('admin/event_form.html.twig', [
            'mode' => 'add',
            'event' => ['name' => '', 'description' => '', 'date' => '', 'time' => '', 'location' => '', 'status' => 'Inactive', 'image' => null],
        ]);
    }

    #[Route('/events/{id}/edit', name: 'admin_event_edit', requirements: ['id' => '\d+'])]
    public function eventEdit(int $id): Response
    {
        $event = SampleData::event($id) ?? throw $this->createNotFoundException('Sample event not found.');

        return $this->render('admin/event_form.html.twig', ['mode' => 'edit', 'event' => $event]);
    }

    #[Route('/reviews', name: 'admin_reviews')]
    public function reviews(): Response
    {
        return $this->render('admin/reviews.html.twig', ['reviews' => SampleData::reviews()]);
    }

    #[Route('/messages', name: 'admin_messages')]
    public function messages(): Response
    {
        $threads = SampleData::threads();

        return $this->render('admin/messages.html.twig', [
            'threads' => $threads,
            'unread_count' => count(array_filter($threads, fn ($t) => $t['status'] === 'Unread')),
        ]);
    }

    #[Route('/subscribers', name: 'admin_subscribers')]
    public function subscribers(): Response
    {
        return $this->render('admin/subscribers.html.twig', ['subscribers' => SampleData::subscribers()]);
    }
}
