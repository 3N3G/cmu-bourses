import { useState } from 'react';
import { Link } from 'react-router-dom';
import { courses } from '../data/mockData';
import { useData } from '../context/DataContext';
import { StarRating } from '../components/StarRating';
import { Search, BookOpen, Clock } from 'lucide-react';

export function CourseList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const { reviews } = useData();

  const departments = [...new Set(courses.map(c => c.department))];

  const filteredCourses = courses.filter(course => {
    const matchesSearch =
      course.courseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment =
      departmentFilter === 'all' || course.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  const getCourseStats = (courseId: string) => {
    const courseReviews = reviews.filter(r => r.courseId === courseId);
    if (courseReviews.length === 0) {
      return { avgRating: 0, reviewCount: 0, avgWorkload: 0 };
    }
    const avgRating =
      courseReviews.reduce((sum, r) => sum + r.overallRating, 0) / courseReviews.length;
    const avgWorkload =
      courseReviews.reduce((sum, r) => sum + r.workloadHours, 0) / courseReviews.length;
    return {
      avgRating: Math.round(avgRating * 10) / 10,
      reviewCount: courseReviews.length,
      avgWorkload: Math.round(avgWorkload)
    };
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Browse Courses</h1>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search by course number or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cmu-red focus:border-transparent"
              />
            </div>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cmu-red focus:border-transparent"
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => {
            const stats = getCourseStats(course.id);
            return (
              <Link
                key={course.id}
                to={`/course/${course.id}`}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="bg-cmu-red text-white px-3 py-1 rounded-md font-mono text-sm">
                    {course.courseNumber}
                  </span>
                  <span className="text-sm text-gray-500">{course.units} units</span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {course.name}
                </h3>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {course.description}
                </p>

                <div className="border-t pt-4">
                  {stats.reviewCount > 0 ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <StarRating rating={Math.round(stats.avgRating)} size={16} />
                        <span className="text-sm font-medium text-gray-700">
                          {stats.avgRating}/5
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <BookOpen size={14} />
                          <span>{stats.reviewCount} reviews</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>~{stats.avgWorkload} hrs/week</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 italic">No reviews yet</p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No courses found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
