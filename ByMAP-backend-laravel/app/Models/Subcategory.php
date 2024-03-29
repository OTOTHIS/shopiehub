<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subcategory extends Model
{
    use HasFactory;
    public function categroies()
    {
        return $this->hasOne(product::class,'category_id');
    }
    protected $fillable = [
        'name',
        'updated_at',
        'created_at',
        "category_id",
      
    ];
    
}
