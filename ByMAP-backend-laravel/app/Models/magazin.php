<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class magazin extends Model
{
    use HasFactory;
    public function owner()
    {
        return $this->belongsTo(Owner::class);
    }
    public function products()
    {
        return $this->hasOne(product::class,'magazin_id');
    }
    public function magazins()
    {
        return $this->belongsTo(Magazin::class, 'magazin_id');
    }
    protected $fillable = [
        'name', 'Latitude', 'Longitude', "image", 'owner_id',
    ];



}
