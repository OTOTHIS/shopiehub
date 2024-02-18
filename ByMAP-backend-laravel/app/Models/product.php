<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class product extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'description',
        'price',
        'image',
        'magazin_id',
        'subcategory_id',
        'category_id',
    ];
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function subcategory()
    {
        return $this->belongsTo(Subcategory::class);
    }
    public static function getPaginatedProducts($perPage)
    {
        return self::with('category', 'magazins')
            ->has('category')
            ->has('magazins')
            ->paginate($perPage);
    }
    public function magazins()
    {
        return $this->belongsTo(Magazin::class, 'magazin_id');
    }
}
